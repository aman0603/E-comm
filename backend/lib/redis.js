import Redis from "ioredis"
import dotenv from "dotenv"
dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

//key value store
// await redis.set('foo', 'bar');

// Test connection
async function testRedis() {
  try {
    await redis.set("foo", "bar");
    const value = await redis.get("foo");
    console.log("✅ Redis test value:", value);
  } catch (err) {
    console.error("❌ Redis test failed:", err.message);
  }
}

testRedis();