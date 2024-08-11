import { DrinkingLogs } from '@/entities';
import { AppDataSource } from '@/utils/database';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';

export function DrinkLogTable() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [items, setItems] = React.useState<DrinkingLogs[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drinkingLogsRepository = AppDataSource.getRepository(DrinkingLogs);
        const logs = await drinkingLogsRepository.find({ relations: ['drink'] });
        setItems(logs);
      } catch (error) {
        console.error('Error fetching data:', error); // エラーログを追加
      }
    };

    fetchData();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Drink</DataTable.Title>
        <DataTable.Title numeric>Created At</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.id}>
          <DataTable.Cell>{item.drink.name}</DataTable.Cell>
          <DataTable.Cell numeric>{new Date(item.createdAt).toLocaleString()}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
}
