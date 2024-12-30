import { useEffect } from 'react';
import CategoryItem from '../components/CategoryItem';
import { useProductStore } from '../stores/useProductStore';
import FeaturedProducts from '../components/FeaturedProducts';

const categories = [
  {
    href: '/main-Courses',
    name: 'Main Courses',
    imageUrl: '/main-Courses.jpg',
  },
  {
    href: '/breads-and-Rice',
    name: 'Breads and Rice',
    imageUrl: '/breads-and-Rice.jpeg',
  },
  { href: '/desserts', name: 'Desserts', imageUrl: '/Desserts.jpg' },
  { href: '/beverages', name: 'Beverages', imageUrl: '/Beverages.jpg' },
  { href: '/appetizers', name: 'Appetizers', imageUrl: '/Appetizers.jpg' },
  {
    href: '/snacks-and-Finger-Foods',
    name: 'Snacks and Finger Foods',
    imageUrl: '/snacks-and-Finger-Foods.jpg',
  },
  {
    href: '/chaat-and-Street-Food',
    name: 'Chaat and Street Food',
    imageUrl: '/chaat-and-Street-Food.jpg',
  },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Serving Sustainability : Discover the Latest Trends in Eco-Friendly
          Catering
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
