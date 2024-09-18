export const addToCart = async (req, res) => {
  try {
    const { productID } = req.user;

    const existingItem = user.cartItems.find((item) => item.id == productID);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productID);
    }

    await user.save;
    res.json(user.cartItems);
  } catch (error) {
    console.log('Error in addToCart controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
