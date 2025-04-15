"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/superbaseclient";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const getUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.log(error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const AllUsers = () => {
  interface User {
    id: string; // Make sure you have id for updates
    username: string;
    email: string;
    phone_number: string;
    status: string;
    university: string;
    location: string;
    role: string;
    gender: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedUsers = await getUsers();
      if (fetchedUsers && fetchedUsers.length > 0) {
        setUsers(fetchedUsers);
      }
    };
    fetchProducts();
  }, []);

  const handleRoleChange = async (email: string, newRole: string) => {
    // Only allow admins to change roles
    if (session?.user.role !== "admin") {
      alert("Only admins can change user roles");
      return;
    }

    try {
      // Update in Supabase
      const { error } = await supabase
        .from("users")
        .update({ role: newRole })
        .eq("email", email);

      if (error) {
        throw error;
      }

      // Update local state
      setUsers(
        users.map((user) =>
          user.email === email ? { ...user, role: newRole } : user
        )
      );

      // Optional: Refresh NextAuth session if current user changed their own role
      if (session?.user.email === email) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role");
    }
  };

  if (users.length === 0) {
    return <div>Loading ...</div>;
  }

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>
          <h1>Users</h1>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <div>
        <CardContent className="mt-8">
          <Table>
            <TableCaption>A list of all users</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>PhoneNumber</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.username}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>
                    <p className="max-w-lg overflow-x-clip">{user.gender}</p>
                  </TableCell>
                  <TableCell>{user.phone_number}</TableCell>
                  <TableCell>{user.university}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell
                    className={`capitalize ${
                      user.role === "admin" ? "text-red-400" : ""
                    }`}
                  >
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.email, e.target.value)
                      }
                      disabled={session?.user.role !== "admin"}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </div>
    </Card>
  );
};

export default AllUsers;
