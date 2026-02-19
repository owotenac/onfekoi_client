// hooks/useItemsList.ts
import { productFilterStore } from '@/model/current-filter';
import { BackEndService } from '@/services/backend';
import { useEffect, useState } from 'react';

export function useItemsList<T>(type: string, transformResult: (result: any) => T[]) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState('');
    const [searchTxt, setSearchTxt] = useState('');
    const currentFilter = productFilterStore((state) => state.currentProductFilter);
    const mainType = productFilterStore((state) => state.mainType);

    useEffect(() => {
        if (type === mainType) fetchItems();
    }, [currentFilter]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const result = await BackEndService.getItems(type);
            setItems(transformResult(result));
            setNextPage(result["next"]);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        if (loading || !nextPage) return;
        setLoading(true);
        const result = await BackEndService.getNextPage(nextPage);
        setItems((prev) => [...prev, ...transformResult(result)]);
        setNextPage(result["next"]);
        setLoading(false);
    };

    const search = async () => {
        setLoading(true);
        const result = await BackEndService.searchItems(searchTxt, type);
        setItems(transformResult(result));
        setNextPage(result["next"]);
        setLoading(false);
    };

    return { items, loading, loadMore, search, searchTxt, setSearchTxt };
}