// hooks/useItemsList.ts
import { useFilterStore } from '@/hooks/useFilterStore';
import { BackEndService } from '@/services/backend';
import { useEffect, useState } from 'react';

export function useItemsList<T>(type: string, transformResult: (result: any) => T[]) {
    const currentFilter = useFilterStore((state) => state.currentProductFilter);
    const geolocalizedResults = useFilterStore((state) => state.geolocalizedResults);

    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState('');
    const [searchTxt, setSearchTxt] = useState('');
    const mainType = useFilterStore((state) => state.mainType);
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (type === mainType) fetchItems();
    }, [currentFilter, geolocalizedResults]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const result = await BackEndService.getItems(type);
            setItems(transformResult(result));
            setNextPage(result["next"]);
        } catch (error) {
            console.error(error);
            setError(error instanceof Error ? error.message : 'Unknown error');
            // return <BackendErrorScreen message={error} onRetry={fetchItems} />
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        if (loading || !nextPage) return;
        try {
            setLoading(true);
            const result = await BackEndService.getNextPage(nextPage);
            setItems((prev) => [...prev, ...transformResult(result)]);
            setNextPage(result["next"]);
        } catch (error) {
            console.error(error);
            setError(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const search = async () => {
        try {
        setLoading(true);
        const result = await BackEndService.searchItems(searchTxt, type);
        setItems(transformResult(result));
        setNextPage(result["next"]);
        } catch (error) {
            console.error(error);
            setError(error instanceof Error ? error.message : 'Unknown error'); 
        } finally {
            setLoading(false);
        }
    };

    return { items, loading, loadMore, search, searchTxt, setSearchTxt, error };
}