import ProductCard from '@/components/product_card';
import { ProductProps } from '@/model/products';
import { useItemsList } from '@/services/useItemsList';
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