// Define types for the data structures
interface ContactFormData {
    run: number;
    forename: string;
    email: string;
    message: string;
  }
  
  interface CartItem {
    name: string;
    quantity: number;
    price: string;
    subtotal: string;
  }
  
  interface CartItemsData {
    items: CartItem[];
    total: string;
  }
  
  // Test Case 2: Contact Form Submission Data
  export const contactFormData: ContactFormData[] = [
    {
      run: 1,
      forename: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello there'
    },
    {
      run: 2,
      forename: 'Alice Smith',
      email: 'alice@example.com',
      message: 'Test message 2'
    },
    {
      run: 3,
      forename: 'Bob Johnson',
      email: 'bob@example.com',
      message: 'Greetings'
    },
    {
      run: 4,
      forename: 'Charlie Brown',
      email: 'charlie@example.com',
      message: 'Sample text'
    },
    {
      run: 5,
      forename: 'Eve Adams',
      email: 'eve@example.com',
      message: 'Another message'
    }
  ];
  
  // Test Case 3: Cart Validation Data
  export const cartItemsData: CartItemsData[] = [
    {
      items: [
        { name: 'Stuffed Frog', quantity: 2, price: '$10.99', subtotal: '$21.98' },
        { name: 'Fluffy Bunny', quantity: 5, price: '$9.99', subtotal: '$49.95' },
        { name: 'Valentine Bear', quantity: 3, price: '$14.99', subtotal: '$44.97' }
      ],
      total: '116.90'
    }
  ];