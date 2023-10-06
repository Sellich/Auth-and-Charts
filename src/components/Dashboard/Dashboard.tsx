import { gql, useQuery } from '@apollo/client';
import Header from '../Header/Header';
import ChartWithList from '../ChartWithList/ChartWithList';
import './Dashboard.css';
import { CATEGORIES } from '../../assets/constants';

const GET_DASHBOARD_STAT = gql`
  query {
    dashboard {
      scenarios {
        active
        inactive
        completed
      }
      lists {
        active
        inactive
        completed
      }
      dialogs {
        active
        inactive
        completed
      }
    }
  }
`;

const Dashboard = () => {
  const { loading, data } = useQuery(GET_DASHBOARD_STAT);
  const dashboardData = data?.dashboard || {};

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='dashboard'>
      <Header />
      <div className='charts-wrapper'>
        {/* Стату засунул немного в такой корявенький массив, посчитал оптимизацию этого не самой приоритетной задаче))) */}
        {CATEGORIES.map((category) => (
          <ChartWithList
            key={category.name}
            data={[
              { id: 1, name: 'Активных', count: dashboardData[category.key]?.active },
              { id: 2, name: 'Неактивных', count: dashboardData[category.key]?.inactive },
              { id: 3, name: 'Завершенных', count: dashboardData[category.key]?.completed },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
