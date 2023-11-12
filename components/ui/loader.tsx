import { Bars } from "react-loader-spinner";

interface LoaderProps {
  text?: string;
}

export const Loader = ({ text }: LoaderProps) => {
  return (
    <div className=" flex gap-2 text-lg items-center">
      {text}
      <Bars
        height={25}
        width={25}
        color="#ffffff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
      />
    </div>
  );
};
