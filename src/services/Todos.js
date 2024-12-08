let mockData = [
  { id: 1, isCompleted: false, content: "Learn React" },
  { id: 2, isCompleted: true, content: "Build a Todo App" },
  { id: 3, isCompleted: false, content: "Master RecoilJS" },
];

mockData = [...mockData];

const getAll = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockData), 500)
  );
};

const create = async (newObject) => {
  console.log('new object which came was', newObject);
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask = {
        id: mockData.length + 1,
        ...newObject,
      };
      mockData = [...mockData, newTask];
      resolve(newTask);
    }, 500);
  });
};

const update = async (id, updatedObject) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taskIndex = mockData.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        const updatedTask = { ...mockData[taskIndex], ...updatedObject };
        mockData = [
          ...mockData.slice(0, taskIndex),
          updatedTask,
          ...mockData.slice(taskIndex + 1),
        ];
        resolve(updatedTask);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

const deleteItem = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taskIndex = mockData.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        const deletedTask = mockData[taskIndex];
        mockData = [
          ...mockData.slice(0, taskIndex),
          ...mockData.slice(taskIndex + 1),
        ];
        resolve(deletedTask);
      } else {
        resolve(null);
      }
    }, 500);
  });
};


const todoService = {
  getAll,
  create,
  update,
  deleteItem,
};

export default todoService;
