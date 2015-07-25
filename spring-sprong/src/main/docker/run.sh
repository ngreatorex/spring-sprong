#!/bin/bash
set -e

env

if [ -n "$SPRING_SPRONG_SPRUNG" ]; then
	echo >&2
	echo >&2 "Spring Sprong has Sprung!"
	echo >&2
fi

exec "$@"