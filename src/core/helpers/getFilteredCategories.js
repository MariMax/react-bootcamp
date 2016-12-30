import { getParentCategories } from './getParentCategories';
import { getFilteredTasks } from './getFilteredTasks';

export const getFilteredCategories = (state, categoryStore, taskStore, showDone = false, searchTerm = '') => {
    const fullList = Object.keys(state[categoryStore].items).map(i => state[categoryStore].items[i]);
    if (!state[taskStore] || Object.keys(state[taskStore].tasks).length === 0) return fullList;
    const fullTaskList = Object.keys(state[taskStore].tasks).map(key => state[taskStore].tasks[key]);
    //empty categories and the whole tree to them should be always shown
    //empty category = category without tasks and without subcategories
    const emptyCategories = fullList
        .filter(i => !fullTaskList.find(t => t.categoryId === i.id))
        .filter(i => !fullList.find(c => c.parent === i.id))
    const categoriesToShow = emptyCategories.reduce((result, item) => {
        return [...result, item, ...getParentCategories(state[categoryStore].items, item.parent)];
    }, []);

    const categoriesWithTasks = fullList
        .filter(i => emptyCategories.indexOf(i) < 0)
        .filter(i => getFilteredTasks(fullTaskList, i.id, showDone, searchTerm).length)
        .reduce((result, item) => {
            return [...result, item, ...getParentCategories(state[categoryStore].items, item.parent)];
        }, []);

    const categories = [...categoriesToShow, ...categoriesWithTasks]
        .reduce((result, category) => {
            result[category.id] = category;
            return result;
        }, {});

    return Object.keys(categories).map(key => categories[key]);
}