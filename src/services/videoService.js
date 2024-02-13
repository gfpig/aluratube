import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://sgcvnmtilgypavhdoofv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnY3ZubXRpbGd5cGF2aGRvb2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDQxMTUsImV4cCI6MTk4Mzc4MDExNX0.Fi-Ns4kVG7-EiPiQwZyixk3oeNI4jycqRmLQ5LFPanA"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("videos")
            .select("*")
        }
    }
}