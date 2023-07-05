import Stripe from "stripe"


const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default async function handler(req, res) {
  
  if (req.method === 'POST') {
    try {
      console.log(req.body)
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
          line_items: req.body.map(item => {
            const img = item.mainImage.asset._ref;
            const newImage = img.replace("image-", "https://cdn.sanity.io/images/gf959rah/production").replace("-webp/-jpg/-jpeg", ".webp")

            return {
              price_data: {
                currency: "usd",
                product_data:{
                  name: item.name,
                  // images:[newImage]
                },
                unit_amount: item.price * 100
              },
              adjustable_quantity: {
                enabled: true,
                minimum: 1
              },
              quantity: item.quantity
            }
          }),
          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/canceled`,
        };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      console.log(session)
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}