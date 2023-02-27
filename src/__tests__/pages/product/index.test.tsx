import Product from '../../../pages/product';
import { render, screen } from '@testing-library/react';

beforeAll(() => render(<Product />));

describe('render element', () => {
	it('render product card', () => {
		expect(screen.getByTestId('product-card')).toBeInTheDocument();
		expect(screen.getByTestId('product-card-header')).toBeInTheDocument();
		expect(screen.getByTestId('product-card-body')).toBeInTheDocument();
		expect(screen.getByTestId('product-card-footer')).toBeInTheDocument();
	});
});
