import React, { createContext, ReactNode, useReducer } from 'react';

type Props = {
	children: ReactNode;
};

export const enum CART_ACTION {
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
		case CART_ACTION.ADD_CART:
			if (state.length === 0) return [action.payload];

			const findItem: Cart | undefined = state.find((item) => {
				return item.productName === action.payload.productName;
			});

			if (findItem) {
				let testState = state.map((item) =>
					item.productName === action.payload.productName
						? { ...item, qty: item.qty + action.payload.qty }
						: item
				);
				return testState;
			} else {
				return [...state, action.payload];
			}

		case CART_ACTION.ADD_QTY:
			return [
				...state.map((item: Cart): Cart => {
					if (item.productName === action.payload.productName) {
						return { ...item, qty: item.qty + 1 };
					}
					return item;
				}),
			];
		case CART_ACTION.SUBSTRACT_QTY:
			return [
				...state.map((item: Cart): Cart => {
					if (item.productName === action.payload.productName) {
						return { ...item, qty: item.qty - 1 };
					}
					return item;
				}),
			];
		case CART_ACTION.SET_QTY:
			return [
				...state.map((item: Cart): Cart => {
					if (item.productName === action.payload.productName) {
						return { ...item, qty: action.payload.qty };
					}
					return item;
				}),
			];
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
	const [state, dispatch] = useReducer(cartReducer, []);

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
}
