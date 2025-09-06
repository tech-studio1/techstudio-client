'use server';

export const handleCurrentSession = async (server_token?: string) => {
  // console.log(server_token);

  try {
    const res = await fetch(
      `${process.env.BASE_URL}/v1/auth/authentication/current-session`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'applicaion/json',
          Authorization: `Bearer ${server_token}`,
        },
        credentials: 'include',
      },
    );
    const result = await res?.json();
    // console.log('current', JSON.stringify(result, null, 2));

    return result?.data;
  } catch (error) {
    // console.log(error);
  }
};

export const handleMyId = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/v1/auth/authentication/profile`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await response.json();
    // console.log(JSON.stringify(result, null, 2));
    return result?.data; // Explicitly cast the response if necessary
  } catch (error) {
    console.error(error);
  }
};
