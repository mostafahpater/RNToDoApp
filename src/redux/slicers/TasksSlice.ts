import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios';

interface taskItem {
  task: string;
  id: number;
  isDone: boolean;
}
interface interfaceState {
  taskList: taskItem[];
  loading: boolean;
  error: string | boolean;
}

const initialState: interfaceState = {
  taskList: [],
  loading: false,
  error: false,
};
export const createTask = createAsyncThunk<taskItem, taskItem, { rejectValue:string  }>(
  'tasks/createTask',
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return data;
    } catch (error) {
      return rejectWithValue('Failed to create task');
    }
  }
);

export const deleteTask = createAsyncThunk<{ id: number }, any, { rejectValue:string  }>(
  'tasks/deleteTask',
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return id;
    } catch (error) {
      return rejectWithValue('Failed to update task');
    }
  }
);

export const updateTask = createAsyncThunk<{ id: number, isDone: boolean }, { id: number, isDone: boolean },{ rejectValue:string  }>(
  'tasks/updateTask',
  async ({ id, isDone }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return { id, isDone };
    } catch (error) {
      return rejectWithValue('Failed to delete task');
    }
  }
);

const TasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = false;
    }).addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      state.taskList.push(action.payload)
    }).addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    })

    builder
    .addCase(deleteTask.pending, (state) => {
      state.loading = true;
      state.error = false;
    }).addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
      state.taskList = state.taskList.filter((item: any) => item.id !== action.payload);
    }).addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    })

    builder
    .addCase(updateTask.pending, (state) => {
      state.loading = true;
      state.error = false;
    }).addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
      state.taskList = state.taskList.map((task) =>
        task.id === action.payload.id ? { ...task, isDone: action.payload.isDone } : task
      );
    }).addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    })

  },
})
// Other code such as selectors can use the imported `RootState` type
//   export const selectCount = (state: RootState) => state.counter.value
export const { startLoading } = TasksSlice.actions
export default TasksSlice.reducer;