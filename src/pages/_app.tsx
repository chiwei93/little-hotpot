import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import {
  MdOutlineSpaceDashboard,
  MdRestaurant,
  MdOutlineQrCodeScanner,
  MdOutlineInventory,
  MdOutlineSettings,
} from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
import { BiErrorCircle, BiBook } from "react-icons/bi";

import Navbar from "@/layouts/common/Navbar/Navbar";
import Sidebar from "@/layouts/common/Sidebar/Sidebar";
import PageContainer from "@/layouts/common/PageContainer/PageContainer";

import "../styles/globals.css";
import { TABLET_BREAKPOINT } from "@/constants/common/breakpoints";

const sidebarContent = [
  {
    icon: <MdOutlineSpaceDashboard />,
    title: "dashboard",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
      {
        name: "placeholder",
        href: "/",
      },
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: true,
  },
  {
    icon: <AiOutlineSafety />,
    title: "accounts",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: true,
  },
  {
    icon: <MdRestaurant />,
    title: "menus",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: true,
  },
  {
    icon: <MdOutlineQrCodeScanner />,
    title: "QR code",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: true,
  },
  {
    icon: <BiBook />,
    title: "orders",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: true,
  },

  {
    icon: <MdOutlineInventory />,
    title: "inventory",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: true,
  },
  {
    icon: <BiErrorCircle />,
    title: "errors",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: true,
  },
  {
    icon: <MdOutlineSettings />,
    title: "settings",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: true,
  },
  {
    icon: <MdOutlineSettings />,
    title: "placeholder1",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: false,
  },
  {
    icon: <MdOutlineSettings />,
    title: "placeholder2",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: false,
  },
  {
    icon: <MdOutlineSettings />,
    title: "placeholder3",
    links: [
      {
        name: "placeholder",
        href: "/",
      },
    ],
    isAdmin: false,
  },
];

function MyApp({ Component, pageProps }: AppProps) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [centerPageContent, setCenterPageContent] = useState(true);
  const router = useRouter();
  const routerPathname = router.pathname;

  useEffect(() => {
    const handleWindowSizeChanges = () => {
      if (window.innerWidth >= TABLET_BREAKPOINT) {
        setShowSidebar(true);
        setCenterPageContent(false);
      } else {
        setShowSidebar(false);
        setCenterPageContent(true);
      }
    };

    handleWindowSizeChanges();
    window.addEventListener("resize", handleWindowSizeChanges);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChanges);
    };
  }, []);

  const changeSidebarVisibleState = (isVisible: boolean) => {
    setShowSidebar(isVisible);
  };

  return (
    <>
      <Navbar
        changeSidebarState={changeSidebarVisibleState}
        pathname={routerPathname}
      />

      <Sidebar
        changeSidebarState={changeSidebarVisibleState}
        isOpen={showSidebar}
        pathname={routerPathname}
        sidebarItems={sidebarContent}
      />

      <PageContainer pathname={routerPathname} centerItems={centerPageContent}>
        <Component {...pageProps} />
      </PageContainer>
    </>
  );
}

export default MyApp;
