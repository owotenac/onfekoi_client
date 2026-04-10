import ProductCard from '@/components/product_card';
import { useItemsList } from '@/hooks/useItemsList';
import { ProductProps } from '@/model/products';
import ItemsLayout from './itemslayout';

export default function ItemsComponents({ type, typeFilter }: { type: string; typeFilter: Record<string, string>; }) {
    const { items, loading, loadMore, search, searchTxt, setSearchTxt, error } = useItemsList<ProductProps>(type, (result) => result['data']);

    return (
        <ItemsLayout
            items={items} loading={loading}
            searchTxt={searchTxt} setSearchTxt={setSearchTxt}
            onSearch={search} onLoadMore={loadMore}
            typeFilter={typeFilter}
            renderItem={({ item }) => <ProductCard {...item} />}
            keyExtractor={(_, index) => index.toString()}
            error={error}
        />
    );
}