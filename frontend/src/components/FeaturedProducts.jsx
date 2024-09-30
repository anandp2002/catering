import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast';

const FeaturedProducts = ({ featuredProducts }) => {
  const { addToCart } = useCartStore();
  const { user } = useUserStore();

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error('Please login to add products to cart');
      return;
    }
    addToCart(product);
  };

  return (
    <div className="pt-12 pb-6">
      <div className="container mx-auto ">
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8">
          Featured Products
        </h2>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex">
            {featuredProducts?.map((product) => (
              <div
                key={product._id}
                className="min-w-[65%] sm:min-w-[50%] lg:min-w-[33%] xl:min-w-[25%] flex-shrink-0 mr-2"
              >
                <div className="bg-black bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30">
                  <div className="overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {product.name}
                    </h3>
                    <p className="text-emerald-300 font-medium mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
