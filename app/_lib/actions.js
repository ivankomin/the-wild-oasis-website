"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateProfile(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("User is not authenticated");
  }

  const [nationality, countryFlag] = formData.get("nationality")?.split("%"); // Split the value to get the country name
  const nationalID = formData.get("nationalID");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Invalid national ID format");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const {data, error} = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();
    
  if (error) {
    console.error(error);
    throw new Error("Profile update failed");
  }

  revalidatePath("/account/profile");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
