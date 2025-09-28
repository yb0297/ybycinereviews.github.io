import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      onSearch={(movies) => console.log('Search results:', movies)}
      onCategoryChange={(category) => console.log('Category changed:', category)}
      activeCategory="popular"
    />
  );
}