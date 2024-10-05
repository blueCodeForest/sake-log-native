import { DrinkingLog } from '@/domains/drinkingLog';
import { useDrinkingLogsData } from '@/hooks';
import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { DrinkingLogRow } from './DrinkingLogRow';

export function DrinkingLogTable() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10, 30, 50]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const drinkingLogs = useDrinkingLogsData({});

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, (drinkingLogs as DrinkingLog[]).length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Drink</DataTable.Title>
          <DataTable.Title numeric>Created At</DataTable.Title>
        </DataTable.Header>
      </DataTable>
      <ScrollView>
        <DataTable>
          {(drinkingLogs as DrinkingLog[]).slice(from, to).map((drinkingLog) => (
            <DrinkingLogRow key={drinkingLog.id} log={drinkingLog} />
          ))}
        </DataTable>
      </ScrollView>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil((drinkingLogs as DrinkingLog[]).length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${(drinkingLogs as DrinkingLog[]).length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </>
  );
}
