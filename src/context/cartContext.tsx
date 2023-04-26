import React, {
	createContext,
	ReactNode,
	useEffect,
	useReducer,
	useRef,
} from 'react';

type Props = {
	children: ReactNode;
};

export const enum CART_ACTION {
	LOAD_LS = 'LOAD_LS',
	ADD_CART = 'ADD_CART',
	ADD_QTY = 'ADD_QTY',
	SUBSTRACT_QTY = 'SUBSTRACT_QTY',
	SET_QTY = 'SET_QTY',
	DELETE_ITEM = 'DELETE_ITEM',
}

export interface Cart {
	productName: string;
	productPrice: number;
	productImgUrl: string;
	qty: number;
}

type CartAction = {
	type: CART_ACTION;
	payload: Cart;
};

function cartReducer(state: Cart[], action: CartAction): Cart[] {
	switch (action.type) {
		case CART_ACTION.LOAD_LS:
			return [...state, action.payload];

		case CART_ACTION.ADD_CART:
			if (state.length === 0) return [action.payload];

			// check if newly added item is already in state
			const findItem: Cart = state.find((item) => {
				return item.productName === action.payload.productName;
			});

			// sum the product qty if payload product is exist in the state
			if (findItem) {
				let addingQty = state.map((item) =>
					item.productName === action.payload.productName
						? { ...item, qty: item.qty + action.payload.qty }
						: item
				);
				return addingQty;
			} else {
				return [...state, action.payload];
			}

		case CART_ACTION.ADD_QTY:
			const addedQtyItems: Cart[] = [
				...state.map((item: Cart): Cart => {
					if (item.productName === action.payload.productName) {
						return { ...item, qty: item.qty + 1 };
					}
					return item;
				}),
			];
			return addedQtyItems;

		case CART_ACTION.SUBSTRACT_QTY:
			const substractQtyItems: Cart[] = [
				...state.map((item: Cart): Cart => {
					if (item.productName === action.payload.productName) {
						return { ...item, qty: item.qty - 1 };
					}
					return item;
				}),
			];
			return substractQtyItems;

		case CART_ACTION.SET_QTY:
			const setQtyItems: Cart[] = [
				...state.map((item: Cart): Cart => {
					if (item.productName === action.payload.productName) {
						return { ...item, qty: action.payload.qty };
					}
					return item;
				}),
			];
			return setQtyItems;

		case CART_ACTION.DELETE_ITEM:
			const newState = state.filter((item) => {
				return item.productName !== action.payload.productName;
			});
			return newState;

		default:
			return state;
	}
}

export const CartContext = createContext<{
	state: Cart[];
	dispatch: React.Dispatch<CartAction>;
}>({
	state: [],
	dispatch: () => undefined,
});

export default function CartContextProvider({ children }: Props) {
	let ls = typeof window !== 'undefined' ? window.localStorage : null;
	const [state, dispatch] = useReducer(cartReducer, []);
	const effectRanRef = useRef(false);

	useEffect(() => {
		// TODO: remove useRef before deploy
		if (!effectRanRef.current) {
			if (ls && ls.getItem('cart')) {
				let lsArray: Cart[] = JSON.parse(ls.getItem('cart'));

				lsArray.map((item) => {
					dispatch({ type: CART_ACTION.LOAD_LS, payload: item });
				});
			}
			effectRanRef.current = true;
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state));
	}, [state]);

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
}
