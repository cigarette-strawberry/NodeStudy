local key = KEYS[1]
local max = tonumber(ARGV[1])
local time = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

local current = tonumber(redis.call('get', key) or '0')

if current + 1 > limit then
    return 0
else
    redis.call('incr', key) -- ++ 0 1 2 3 4
    redis.call('expire', key, time)
    return 1
end

-- return {key, max, time, limit}
