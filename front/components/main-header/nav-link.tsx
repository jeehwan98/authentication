import Link from "next/link";

export default function NavLink() {
  return (
    <li>
      <Link className="text-gray-500 hover:text-white" href="/login">Login Page</Link>
    </li>
  )
}