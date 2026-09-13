# Video Performance Optimization Guide

## Current Status
- **File Size**: 41.12 MB (too large - should be 8-15 MB for smooth playback)
- **Issue**: Large file size causes buffering and lag during scroll interactions

## Optimizations Applied
1. ✅ **Scrub smoothness**: Reduced from 1.6 to 0.5 (less aggressive sync)
2. ✅ **Seek threshold**: Increased from 0.08s to 0.15s (fewer seek operations)
3. ✅ **GPU Acceleration**: Added `will-change` and `backface-visibility` to CSS
4. ✅ **Hardware optimization**: Enabled 3D transforms for smoother animations

## Video Re-encoding Recommendations

### Option 1: Aggressive Optimization (Recommended)
**Best for web - targets 10-12 MB**
```bash
ffmpeg -i one.mp4 -c:v libx264 -preset slow -crf 26 -c:a aac -b:a 96k -vf "scale=1920:-2" -movflags +faststart output.mp4
```
- Quality: High (crf 26)
- Audio: 96 kbps AAC
- Speed: Reasonable file size + quality balance

### Option 2: Maximum Quality (Use if budget allows)
**Targets 15-18 MB**
```bash
ffmpeg -i one.mp4 -c:v libx264 -preset veryslow -crf 22 -c:a aac -b:a 128k -vf "scale=1920:-2" -movflags +faststart output.mp4
```
- Quality: Very high (crf 22)
- Audio: 128 kbps AAC
- Best visual quality

### Option 3: Lightweight (Use if targeting older devices)
**Targets 6-8 MB**
```bash
ffmpeg -i one.mp4 -c:v libx264 -preset fast -crf 28 -c:a aac -b:a 64k -vf "scale=1280:-2" -movflags +faststart output.mp4
```
- Quality: Good (crf 28, lower resolution)
- Audio: 64 kbps AAC
- Smallest file size

## H.265 Alternative (Even Better Compression)
If browser compatibility allows (modern browsers):
```bash
ffmpeg -i one.mp4 -c:v libx265 -preset medium -crf 26 -c:a aac -b:a 96k -vf "scale=1920:-2" -movflags +faststart output.mp4
```
- Results in ~30-40% smaller files than H.264
- Not supported on older browsers or Safari

## Critical Flags Explained
- `-movflags +faststart`: Moves metadata to front (enables instant playback)
- `-crf [22-28]`: Quality (lower = better, 18-28 recommended for web)
- `-preset [fast|medium|slow]`: Encoding speed vs compression tradeoff
- `-vf "scale=1920:-2"`: Maintains aspect ratio, caps width at 1920px
- `-b:a 96k`: Audio bitrate (96 kbps is good balance)

## Steps to Implement
1. Download FFmpeg from https://ffmpeg.org/download.html
2. Place video in project root
3. Run one of the commands above
4. Replace `/public/video/one.mp4` with the optimized version
5. Test in browser - scroll should be smooth now

## Expected Results After Optimization
- ✅ Smooth video scrubbing on scroll
- ✅ Faster initial load
- ✅ Reduced bandwidth usage
- ✅ Better performance on lower-end devices

## Additional Browser Optimization
The component already handles:
- Responsive sizing
- Hardware acceleration via CSS
- Efficient seek operations
- Mobile fallback to static image
