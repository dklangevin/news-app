import { useRouter } from 'next/router';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 0 80px 0;
  padding: 30px 0 0 0;
`;

const MenuItem = styled.div`
  padding: 15px 20px 15px 20px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  border-radius: 5px;
`;

const categories = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Sports',
  'Technology',
];

const Menu = () => {
  const router = useRouter();
  return (
    <Div>
      <MenuItem onClick={() => router.push('/all/1')}>Home</MenuItem>
      {categories.map((category, index) => (
        <MenuItem onClick={() => router.push(`/${category}/1`)}>
          {category}
        </MenuItem>
      ))}
    </Div>
  );
};

export default Menu;
