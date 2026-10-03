# Gradio Chatbot Connection Fix

## Issue
The chatbot was showing "Failed to connect to AI service. Please try again." error when trying to connect to the Hugging Face Space.

## Root Causes

### 1. Hugging Face Space Sleeping
- HF Spaces automatically sleep after 48 hours of inactivity (free tier)
- Cold start can take 30-60 seconds
- Space needs to be "awake" before accepting connections

### 2. Connection Method
- Using space name format: `shkumar1991/llm-chat-custom`
- Should use full URL: `https://shkumar1991-llm-chat-custom.hf.space`

### 3. No Retry Mechanism
- Single connection attempt with no fallback
- No way to manually reconnect

## Solutions Implemented

### 1. Dual Connection Strategy
```typescript
// Try full URL first
const client = await Client.connect("https://shkumar1991-llm-chat-custom.hf.space");

// Fallback to space name format
const client = await Client.connect("shkumar1991/llm-chat-custom", {
  hf_token: undefined,
});
```

### 2. Manual Reconnect Button
Added reconnect button in two places:
- **Header**: Small refresh icon when offline
- **Error Message**: "Try Reconnecting" button below error

```typescript
const handleReconnect = () => {
  clientRef.current = null;
  setIsConnected(false);
  initializeClient();
};
```

### 3. Better Error Messages
- More descriptive error messages
- Indicates if Space might be sleeping
- Suggests waiting and retrying

## How to Fix Connection Issues

### Step 1: Wake Up the Space
1. Visit your Hugging Face Space directly:
   - https://huggingface.co/spaces/shkumar1991/llm-chat-custom
2. Wait for it to load (30-60 seconds on cold start)
3. You should see the Gradio interface

### Step 2: Check Space Status
- **Running**: Green dot in header ✅
- **Building**: Yellow/orange indicator ⏳
- **Sleeping**: Space needs to be woken up ⚠️
- **Error**: Check Space logs ❌

### Step 3: Test Connection
1. Open your portfolio website
2. Click the chat button (bottom-right)
3. Wait for green dot to appear
4. If error appears, click "Try Reconnecting"
5. Try asking a question

### Step 4: Verify Space Configuration
Make sure your HF Space has:
- ✅ `/generate_text` endpoint
- ✅ Accepts `prompt`, `system_prompt`, `temperature` parameters
- ✅ Returns text response
- ✅ CORS enabled (should be default for HF Spaces)

## Troubleshooting Guide

### Error: "Failed to connect to AI service"

**Possible Causes:**
1. Space is sleeping
2. Space is building/deploying
3. Network issues
4. Space configuration error

**Solutions:**
1. Visit Space URL directly to wake it up
2. Wait 1-2 minutes for cold start
3. Click "Try Reconnecting" button
4. Check browser console for detailed errors
5. Verify Space is public and accessible

### Error: "Failed to get response"

**Possible Causes:**
1. Space is overloaded
2. API endpoint mismatch
3. Parameter format incorrect
4. Timeout

**Solutions:**
1. Wait and retry
2. Check Space logs for errors
3. Verify API endpoint name matches
4. Reduce context size if too large

### Space Won't Wake Up

**Solutions:**
1. Check Space logs in HF dashboard
2. Verify no errors in app.py
3. Check if dependencies are installed correctly
4. Restart Space from HF dashboard
5. Check HF status page for outages

## Testing the Connection

### Manual Test
```javascript
// Open browser console and run:
import { Client } from "@gradio/client";
const client = await Client.connect("https://shkumar1991-llm-chat-custom.hf.space");
console.log("Connected!");
```

### API Test
```javascript
const result = await client.predict("/generate_text", {
  prompt: "Hello",
  system_prompt: "You are a helpful assistant.",
  temperature: 0.7,
});
console.log(result);
```

## Expected Behavior

### Successful Connection
1. Click chat button → Window opens
2. "Connecting..." shows in header
3. Green dot appears (1-5 seconds)
4. "AI Assistant" status shows
5. Ready to accept questions

### Failed Connection
1. Click chat button → Window opens
2. "Connecting..." shows in header
3. Error message appears
4. "Try Reconnecting" button shows
5. Click button to retry

## Performance Expectations

### Connection Time
- **Warm Space**: 1-3 seconds
- **Cold Start**: 30-60 seconds
- **Sleeping Space**: Need to wake up first

### Response Time
- **Simple Questions**: 2-5 seconds
- **Complex Questions**: 5-10 seconds
- **Long Context**: 10-15 seconds

## Monitoring

### Check Space Status
- Visit: https://huggingface.co/spaces/shkumar1991/llm-chat-custom
- Check "Logs" tab for errors
- Monitor "Metrics" for usage

### Browser Console
Open DevTools (F12) and check Console tab for:
- Connection errors
- API call failures
- Network issues

## Prevention

### Keep Space Awake
1. Visit Space URL daily
2. Set up uptime monitoring (e.g., UptimeRobot)
3. Consider HF Pro tier for always-on Spaces
4. Use a cron job to ping the Space

### Optimize Performance
1. Reduce context size
2. Cache common responses
3. Implement request debouncing
4. Add loading states

## Alternative Solutions

If Gradio connection continues to fail:

### Option 1: Use Hugging Face Inference API
```typescript
const response = await fetch(
  "https://api-inference.huggingface.co/models/YOUR_MODEL",
  {
    headers: { Authorization: `Bearer ${HF_TOKEN}` },
    method: "POST",
    body: JSON.stringify({ inputs: prompt }),
  }
);
```

### Option 2: Deploy on Vercel/Netlify
- Create serverless function
- Call HF API from backend
- Avoid CORS issues

### Option 3: Use OpenAI/Anthropic API
- More reliable
- Better performance
- Requires API key and payment

## Current Status

✅ **Build**: Successful (259.35 KB)  
✅ **Connection Logic**: Dual-method with retry  
✅ **Error Handling**: Comprehensive with reconnect  
✅ **UI Feedback**: Clear status indicators  
✅ **Documentation**: Complete troubleshooting guide  

## Next Steps

1. **Test the Space**: Visit HF Space URL to ensure it's running
2. **Test Connection**: Open portfolio and try chatbot
3. **Monitor**: Check browser console for any errors
4. **Iterate**: Adjust based on actual usage patterns

## Support Resources

- [Gradio Client Documentation](https://www.gradio.app/guides/getting-started-with-the-js-client)
- [Hugging Face Spaces Docs](https://huggingface.co/docs/hub/spaces)
- [HF Space Status](https://status.huggingface.co/)
- [Gradio GitHub Issues](https://github.com/gradio-app/gradio/issues)

---

**Last Updated**: Connection fix implemented with retry logic and better error handling
