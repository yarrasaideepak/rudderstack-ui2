import eventObj from "./EventObj";

type trackingObj = {

	"tracking_plan": {
        "display_name": String,
        "rules": {
            "events": eventObj[]
        }
    }
};
  
export default trackingObj;