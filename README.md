# Montamo Price Calendar

A responsive price calendar application for Montamo's heat pump installations, similar to Skyscanner's flight price calendar.

## Features

- Simple landing page with responsive design
- Mobile-ready interface
- Customer information display
- Monthly calendar view with color-coded weeks showing pricing
- Price calculation based on base price and percentage modifiers
- URL parameter support for customer data and base price

## URL Parameters

The application accepts the following URL parameters:

- `basePrice`: The base price for the heat pump (default: 10000)
- `customerName`: The name of the customer
- `dealId`: The ID of the deal/offer
- `location`: The location of the installation

Example URL:
```
http://localhost:3000/?basePrice=12500&customerName=Max%20Mustermann&dealId=WP-2023-001&location=München
```

## Calendar Design

The calendar displays a monthly view where:
- Each day is color-coded based on its calendar week
- Green weeks indicate lower prices
- Yellow weeks indicate standard prices
- Red weeks indicate higher prices (peak season)
- Gray weeks are disabled/unavailable
- The first day of each week shows the week number (KW) and the price for that week

## Price Matrix

The price matrix is currently defined in a JSON file (`public/price-matrix.json`). In the future, this will be fetched from an API.

The matrix contains:
- Percentage modifiers for each calendar week
- Status indicators (success, warning, danger)
- List of disabled weeks

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- Next.js
- React
- Tailwind CSS
- React Day Picker
- date-fns
- JavaScript

## Customization

The application uses Montamo's brand colors:
- Primary: #FCE100 (Yellow)
- Secondary: #012B3F (Dark Blue)

These colors can be customized in the `tailwind.config.js` file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
