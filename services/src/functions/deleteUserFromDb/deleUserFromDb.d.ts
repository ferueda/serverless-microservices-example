export type UserRecord = {
  email: string;
  metadata: {
    createdAt: string;
    lastSignedInAt: string;
  };
  uid: string;
};
