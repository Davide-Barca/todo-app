Subito dopo l'installazione (prima volta)
```
npm install prisma @prisma/client
npx prisma init
# (modifichi prisma/schema.prisma)
npx prisma migrate dev --name init
```

Ogni volta che lo schema viene modificato
```
npx prisma migrate dev --name nome_modifica
```

Se deve essere rigenerato il client
```
npx prisma generate
```

Dopo un *git pull* con nuove migrations
```
npm install
npx prisma migrate dev
```