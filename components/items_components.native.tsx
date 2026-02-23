import ProductCard from '@/components/product_card';
import ProductCardSponsored from '@/components/product_card_sponsored';
import { injectAdSlots, ListItem } from '@/services/ads';
import { useItemsList } from '@/services/useItemsList';
import ItemsLayout from './itemslayout';

export default function ItemsComponents({ type, typeFilter }: { type: string; typeFilter: Record<string, string>; }) {

    const { items, loading, loadMore, search, searchTxt, setSearchTxt, error } = useItemsList<ListItem>(type, (result) => injectAdSlots(result['data']));

    const renderItem = ({ item }: { item: ListItem }) => {
        if (item.type === 'ad') return <ProductCardSponsored />;
        return <ProductCard {...item.data} />;
    };

    return (
        <ItemsLayout
            items={items} loading={loading}
            searchTxt={searchTxt} setSearchTxt={setSearchTxt}
            onSearch={search} onLoadMore={loadMore}
            typeFilter={typeFilter} renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            error={error}
        />
    );
}