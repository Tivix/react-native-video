package com.brentvatne.exoplayer;

import android.content.Context;

import com.google.android.exoplayer2.database.ExoDatabaseProvider;
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor;
import com.google.android.exoplayer2.upstream.cache.SimpleCache;

public class VideoCache {
    private static SimpleCache objCache;
    private static LeastRecentlyUsedCacheEvictor leastRecentlyUsedCacheEvictor = null;
    private static ExoDatabaseProvider exoDatabaseProvider = null;
    private static long exoPlayerCacheSize = 90 * 1024 * 1024;

    public static SimpleCache getInstance(Context context)
    {
        if (leastRecentlyUsedCacheEvictor == null) {
            leastRecentlyUsedCacheEvictor = new LeastRecentlyUsedCacheEvictor(exoPlayerCacheSize);
        }

        if (exoDatabaseProvider != null) {
            exoDatabaseProvider = new ExoDatabaseProvider(context);
        }
        if (objCache == null)
        {
            objCache = new SimpleCache(context.getCacheDir(), leastRecentlyUsedCacheEvictor, exoDatabaseProvider);
        }
        return objCache;
    }

}


