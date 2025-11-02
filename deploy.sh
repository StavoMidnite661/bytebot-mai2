#!/bin/bash

# ─── Configuration ────────────────────────────────────────────────────────────
LOG_FILE="deploy.log"

# ─── Logging Functions ────────────────────────────────────────────────────────
log()   { echo "$(date +'%Y-%m-%d %H:%M:%S') [INFO] $@" | tee -a "$LOG_FILE"; }
warn()  { echo "$(date +'%Y-%m-%d %H:%M:%S') [WARN] $@" | tee -a "$LOG_FILE"; }
error() { echo "$(date +'%Y-%m-%d %H:%M:%S') [ERROR] $@" | tee -a "$LOG_FILE"; exit 1; }

# ─── Pre-checks ───────────────────────────────────────────────────────────────
check_command() {
  command -v "$1" >/dev/null 2>&1 || error "$1 is not installed. Please install it to proceed."
}

check_command docker
check_command docker-compose
check_command curl
check_command npx # For http-server

# ─── STEP 1: Check for Ollama ───────────────────────────────────────────────
log "Checking for Ollama..."
if pgrep -x "ollama" > /dev/null; then
  log "✅ Ollama is running. Local LLM available at http://localhost:11434"
  USE_LOCAL_LLM=true
else
  warn "Ollama not running. Install from https://ollama.com and run 'ollama serve'"
  warn "Local LLM will be disabled until Ollama is active."
  USE_LOCAL_LLM=false
fi

# ─── STEP 2: Prepare .env for UI ────────────────────────────────────────────
log "Preparing .env for UI..."
# Read GEMINI_API_KEY from docker/.env
GEMINI_API_KEY=$(grep -E '^GEMINI_API_KEY=' docker/.env | cut -d '=' -f2)
if [ -z "$GEMINI_API_KEY" ]; then
  warn "GEMINI_API_KEY not found in docker/.env. UI might not function correctly for cloud LLM."
fi

# Replace placeholder in index.html with actual GEMINI_API_KEY and USE_LOCAL_LLM status
# Use a temporary file for sed to work across systems
sed -i.bak "s|// Replaced by deploy.sh|"${GEMINI_API_KEY}"|" index.html
sed -i.bak "s|USE_LOCAL_LLM: false,|USE_LOCAL_LLM: ${USE_LOCAL_LLM},|" index.html
rm index.html.bak
log "✅ index.html updated with environment variables."

# ─── STEP 3: Build and Start Docker Containers ────────────────────────────────
log "Building and starting Docker containers..."
docker-compose -f docker/docker-compose.yml down --remove-orphans || true
docker-compose -f docker/docker-compose.yml up -d --build || error "Failed to start Docker containers."
log "✅ Docker containers started."

# ─── STEP 4: Verify Agent API ─────────────────────────────────────────────────
log "Waiting for Bytebot Agent API to be ready..."
for i in {1..20}; do
  if curl -s http://localhost:9991/tasks >/dev/null; then
    log "✅ Bytebot Agent API is reachable."
    AGENT_READY=true
    break
  fi
  sleep 1
done

if [ "$AGENT_READY" != true ]; then
  error "Bytebot Agent API did not become ready in time."
fi

# ─── STEP 5: Serve UI ─────────────────────────────────────────────────────────
log "Serving J.A.R.V.I.S. UI..."
npx http-server -p 3000 & 
UI_PID=$!
log "✅ J.A.R.V.I.S. UI served on http://localhost:3000 (PID: $UI_PID)"
log "Deployment complete. Open http://localhost:3000 in your browser."

# Keep the script running to keep http-server alive
wait $UI_PID
