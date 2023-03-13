/**
 * @jest-environment jsdom
 */

import Home from '@/pages';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('home page render', () => {
	it('render page component', () => {
		render(<Home />);
		expect(screen.getByTestId('hero_text')).toBeInTheDocument();
		expect(screen.getByTestId('product_card')).toBeInTheDocument();
		expect(screen.getByTestId('why_section')).toBeInTheDocument();
		expect(screen.getByTestId('faq_section')).toBeInTheDocument();
	});
});
