export type User = {
  id: string;
  isAdmin: boolean;
  name: string;
};

const EXAMPLE_USERS: User[] = JSON.parse(`
[
  {
     "id":"bryan",
     "isAdmin": true,
     "name": "Bryan"
  },
  {
     "id":"erran",
     "isAdmin": false,
     "name": "Erran"
  },
  {
     "id":"matt",
     "isAdmin": false,
     "name": "Matt"
  }
]`);

export default EXAMPLE_USERS;
