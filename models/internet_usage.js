import { Schema, model } from "mongoose";
const InternetUsageSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mac_address: {
    type: String,
    required: true,
  },
  start_time: {
    type: Date,
    default: Date.now,
  },
  usage_time: {
    type: Date,
  },
  upload_size: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  download_size: {
    type: Schema.Types.Decimal128,
    required: true,
  },
});
const InternetUsage = model("InternetUsage", InternetUsageSchema);
export { InternetUsage };
