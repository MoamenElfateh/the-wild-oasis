import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(`User Could Not Be Sign Up : ${error.message}`);
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(`User Could Not Be Sign In : ${error.message}`);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Not A Current User : ${error.message}`);
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(`Can Not Logout : ${error.message}`);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName [not-at-same-time]
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } }; // check how upload additional data in login

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(
      `Can Not Update User fullName OR password : ${error.message}`,
    );
  }
  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar=${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) {
    throw new Error(`Can Not Upload Avatar : ${storageError.message}`);
  }

  // 3. Update avatar in the user
  const { data: updatedUser, error: updatedError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedError) {
    throw new Error(`Can Not Update User : ${updatedError.message}`);
  }

  return updatedUser;
}
