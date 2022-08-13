import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRecipes,
  getDiets,
  sortBy,
  filterByDiet,
} from '../../redux/actions';
import Card from '../../components/Card/Card.jsx';
import Search from '../../components/Search/Search.jsx';
import Filter from '../../components/Filter/Filter';
import Sort from '../../components/Sort/Sort.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import s from './Home.module.css';

function Home() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    if (!state.recipes.length) {
      dispatch(getDiets());
      dispatch(getRecipes());
    }
  }, [dispatch, state.recipes.length, state.filtered]);

  // Filters handling
  const handleFiltersReset = () => {
    dispatch(getRecipes())
  };

  return (
    <div className={s.container}>
      {state.loading && state.loading === true ? (
        <Loader />
      ) : (
        <div>
          <div className={s.menus}>
            <Search />
            <Sort
              label="Sort options"
              options={[
                { name: 'Alphabetically', values: ['A-Z', 'Z-A'] },
                { name: 'Health Score', values: ['0-100', '100-0'] },
              ]}
              dispatchHandler={sortBy}
            />
            <Filter
              label="Filter by diet"
              options={state.diets && state.diets}
              dispatchHandler={filterByDiet}
            />
            <button onClick={handleFiltersReset}>Reset Filters</button>
          </div>
          <div className={s.recipes}>
            {state.filtered &&
              state.filtered.map(recipe => {
                return (
                  <Card
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    score={recipe.healthScore}
                    diets={recipe.diets}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
