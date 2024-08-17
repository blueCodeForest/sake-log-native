import { DrinkingLog } from '@/entities';
import { AppDataSource } from '@/utils/repositories';
import { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';

export function DrinkingLogTable() {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [drinkingLogs, setDrinkingLogs] = useState<DrinkingLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const drinkingLogsRepository = AppDataSource.getRepository(DrinkingLog);
        // const logs = await drinkingLogsRepository.find({
        //   relations: {
        //     drink: {
        //       drinkSize: true,
        //     },
        //   },
        // });
        // const logs = await drinkingLogsRepository
        //   .createQueryBuilder('drinkingLog')
        //   .leftJoinAndSelect('drinkingLog.drink', 'drink')
        //   .leftJoinAndSelect('drink.size', 'drinkSize')
        //   .getMany();
        // setDrinkingLogs(logs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, drinkingLogs.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Drink</DataTable.Title>
        <DataTable.Title numeric>Created At</DataTable.Title>
      </DataTable.Header>

      {drinkingLogs.slice(from, to).map((drinkingLog) => (
        <DataTable.Row key={drinkingLog.id}>
          <DataTable.Cell>{drinkingLog.drink.name}</DataTable.Cell>
          <DataTable.Cell numeric>
            {new Date(drinkingLog.createdAt).toLocaleString()}
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(drinkingLogs.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${drinkingLogs.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
}
