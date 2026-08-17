import Banner from "@/components/Banner";
import Details from "@/components/Details";
import FeaturedRoom from "@/components/FeaturedRoom";
import Work from "@/components/Comment";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner/>
      <FeaturedRoom/>
      <Details/>
      <Work/>

    </div>
    
  );
}
