import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const driveId = searchParams.get('id');
  const directUrl = searchParams.get('url');

  let targetUrl = '';

  if (driveId) {
    targetUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(
      driveId
    )}&export=download&confirm=t`;
  } else if (directUrl) {
    targetUrl = directUrl;
  } else {
    return new NextResponse('Missing video id or url parameter', { status: 400 });
  }

  try {
    const rangeHeader = request.headers.get('range');
    const headers: Record<string, string> = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    };

    if (rangeHeader) {
      headers['Range'] = rangeHeader;
    }

    const upstreamResponse = await fetch(targetUrl, {
      headers,
      cache: 'no-store',
    });

    if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
      // If direct download fails, redirect to embed preview fallback
      if (driveId) {
        return NextResponse.redirect(`https://drive.google.com/file/d/${driveId}/preview`);
      }
      return new NextResponse('Failed to fetch video stream', { status: upstreamResponse.status });
    }

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', upstreamResponse.headers.get('content-type') || 'video/mp4');
    responseHeaders.set('Accept-Ranges', 'bytes');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');

    const contentLength = upstreamResponse.headers.get('content-length');
    if (contentLength) {
      responseHeaders.set('Content-Length', contentLength);
    }

    const contentRange = upstreamResponse.headers.get('content-range');
    if (contentRange) {
      responseHeaders.set('Content-Range', contentRange);
    }

    return new NextResponse(upstreamResponse.body as BodyInit, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Video proxy streaming error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
