import { createSelector } from 'reselect';

const selectTaskList = state => state.tasks.taskList;

export const selectFilteredTasks = searchText =>
  createSelector([selectTaskList], taskList =>
    taskList.filter(tasks =>
      tasks.title.toLowerCase().includes(searchText.toLowerCase())
    )
  );
