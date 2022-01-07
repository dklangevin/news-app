import styled from 'styled-components';

import Menu from '../../components/Menu';

const Article = styled.div`
  width: 100%;
  margin: 0 0 80px 0;
  padding: 0 20px 0 20px;
  cursor: pointer;
`;
const Title = styled.h1`
  font-size: 24px;
`;
const Image = styled.img`
  width: 100%;
`;

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

const Feed = ({ pageNumber, articles }) => {
  console.log(articles);
  return (
    <div className='page-container'>
      <Menu />
      {articles.map((article, index) => (
        <Article
          key={index}
          onClick={() => (window.location.href = article.url)}
        >
          <Title>{article.title}</Title>
          <p>{article.description}</p>
          {!!article.urlToImage && <Image src={article.urlToImage} />}
        </Article>
      ))}
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const category = pageContext.query.category;
  const pageNumber = pageContext.query.pageId;
  if (pageNumber === undefined || pageNumber < 1) {
    return {
      props: {
        articles: [],
        category: categories.includes(category) ? category : 'all',
        pageNumber: 1,
      },
    };
  }

  const categoryStr = category !== 'all' ? `&category=${category}` : '';

  const apiResponse = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&page=${pageNumber}${categoryStr}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
      },
    }
  );

  const apiJson = await apiResponse.json();

  const { articles } = apiJson;

  return {
    props: {
      articles: articles,
      category: category,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;
