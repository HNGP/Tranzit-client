import { Form, Select, InputNumber, Switch, Slider, Button } from "antd";
import { MdCircle } from "react-icons/md";
import { Steps } from "antd";

// Custom DatePicker that uses Day.js instead of Moment.js
// import DatePicker from "../components/DatePicker";

import { SmileFilled } from "@ant-design/icons";

import Link from "next/link";

const { Step } = Steps;

const content = {
  marginTop: "100px",
};

export default function Home() {
  return (
    <div style={content}>
      <div className="text-center mb-5">
        <Link href="#">
          <a className="logo mr-0">
            <SmileFilled size={48} strokeWidth={1} />
          </a>
        </Link>

        <p className="mb-0 mt-3 text-disabled">Welcome to the world !</p>
      </div>
      <div style={{ marginLeft: "100px" }}>
        <Steps direction="vertical" current={100}>
          <Step
            title="HUDA City Centre"
            description="Yellow Line"
            icon={<MdCircle style={{ color: "#FFCC02" }} />}
          />
          <Step
            title="IFFCO Chowk"
            description="Blue Line"
            icon={<MdCircle style={{ color: "#FFCC02" }} />}
          />
          <Step
            title="Rajiv Chowk"
            description="Blue Line"
            icon={<MdCircle style={{ color: "#FFCC02" }} />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
          <Step
            title="Dwarka Sector XXX"
            description="Blue Line"
            icon={<MdCircle />}
          />
        </Steps>
        ,
      </div>
    </div>
  );
}
