@echo off

:VARIABLES
@REM These are mandatory
@REM -------------------
set PROJECT_NAME=fullstackopen-part3-phonebook

@REM These are optional
@REM Comment out anything you don't need
@REM -----------------------------------
set EPHEMERAL=yes
set DOCKER_PORT=3000
set HOST_PORT=3000
@REM set NPM_ARGS="Some other cmd + args"
@REM set NPM_ARGS_DEV="Some other cmd + args"

:TESTS
:and
:SETUP 
if not defined PROJECT_NAME (
    echo 'PROJECT_NAME' not defined, cannot continue 1>&2
    goto END
)

@REM todo: This is pretty janky logic. 'DOCKER_PORT' is always set while 'HOST_PORT' is only sometimes set.
@REM       Do we *always* need to pass in the '--build-args' if they're not gonna be used?
@REM       Tons of room for improvement here, but already this is way better than the previous dumb script
if defined DOCKER_PORT (
    if defined HOST_PORT (
        set NETWORK_CFG=-p %HOST_PORT%:%DOCKER_PORT%
    ) else (
        echo warning - 'DOCKER_PORT' set without corresponding 'HOST_PORT'. Assuming '%DOCKER_PORT%' 1>&2
        set NETWORK_CFG=-p %DOCKER_PORT%:%DOCKER_PORT%
    )
) else (
    if defined HOST_PORT (
        echo warning - 'HOST_PORT' set without corresponding 'DOCKER_PORT'. Assuming '%HOST_PORT%' 1>&2
        set NETWORK_CFG=-p %HOST_PORT%:%HOST_PORT%
        @REM Needed for the '--build-arg' param below
        set DOCKER_PORT=%HOST_PORT%
    ) else (
        set NETWORK_CFG=
    )
)

@REM This is also just dumb but it works :P
if not defined NPM_ARGS (
    set NPM_ARGS_PROD="start"
    set NPM_ARGS_DEV="run dev"
) else (
    set NPM_ARGS_PROD=%NPM_ARGS%
    if not defined NPM_ARGS_DEV (
        set NPM_ARGS_DEV=%NPM_ARGS%
    )
)
@REM todo: this is hacky, but for now it works
set DEV_MODE=%1
if defined DEV_MODE (
    set PROJECT_NAME=%PROJECT_NAME%-dev
    set DOCKERFILE=Dockerfile.dev
    set VOLUME_CFG=-v .:/app
    set NPM_ARGS=%NPM_ARGS_DEV%
) else (
    set DOCKERFILE=Dockerfile.prod
    set VOLUME_CFG=
    set NPM_ARGS=%NPM_ARGS_PROD%
)

if defined EPHEMERAL (
    set EPHEMERAL=--rm
)

:COMMANDS
set BUILD=docker build -f %DOCKERFILE% -t %PROJECT_NAME% --build-arg port=%DOCKER_PORT% --build-arg npm_args=%NPM_ARGS% .
set RUN=docker run -it %EPHEMERAL% %VOLUME_CFG% %NETWORK_CFG% %PROJECT_NAME%

:DEBUG
@REM Uncomment these as necessary
@REM echo DEV_MODE      = %DEV_MODE%
@REM echo PROJECT_NAME  = %PROJECT_NAME%
@REM echo DOCKER_PORT   = %DOCKER_PORT%
@REM echo HOST_PORT     = %HOST_PORT%
@REM echo NPM_ARGS_PROD = %NPM_ARGS_PROD%
@REM echo NPM_ARGS_DEV  = %NPM_ARGS_DEV%
@REM echo NPM_ARGS      = %NPM_ARGS%
@REM echo EPHEMERAL     = %EPHEMERAL%
@REM echo NETWORK_CFG   = %NETWORK_CFG%
@REM echo VOLUME_CFG    = %VOLUME_CFG%
@REM echo DOCKERFILE    = %DOCKERFILE%
@REM echo BUILD         = %BUILD%
@REM echo RUN           = %RUN%

:EXECUTE
%BUILD%
%RUN%

:END