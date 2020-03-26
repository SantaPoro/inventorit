# inventorit

## Requirements

* Docker
* Docker compose

## Running

### Environment variables

Copy example file

```
cp .env.example .env
```

Fill in fields in .env

### Development

```
docker-compose up -d
```

### Production

```
docker-compose -f docker-compose.prod.yml up -d
```
