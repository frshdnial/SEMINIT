<?php
namespace App\Models;
use PDO;
final class MeetingReportRepository
{
    //create a connection PDO object
    public function __construct(private PDO $pdo)
    {
    }
    public function all(string $q = '', int $limit = 0): array
    {
        $sql = 'SELECT * FROM MeetingReport';
        $args = [];
        if ($q !== '') {
            $sql .= ' WHERE title LIKE :q_title OR Description LIKE :q_description';
            $args[':q_title'] = '%' . $q . '%';
            $args[':q_description'] = '%' . $q . '%';
        }
        $sql .= ' ORDER BY MeetingID ASC';
        if ($limit > 0)
            $sql .= ' LIMIT ' . max(1, $limit);
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($args);
        return $stmt->fetchAll();
    }
    public function find(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM MeetingReport WHERE MeetingID = :id');
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row === false ? null : $row;
    }

    public function create(array $b, int $createdBy): int
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO MeetingReport (DateTime, Description, Duration, Title, User_ID)
 VALUES (:DateTime, :Description, :Duration, :Title, :User_ID)'
        );
        $stmt->execute([
            ':DateTime' => trim($b['DateTime']),
            ':Description' => trim($b['Description']),
            ':Duration' => (int) $b['Duration'],
            ':Title' => trim($b['Title']),
            ':User_ID' => $createdBy
        ]);
        return (int) $this->pdo->lastInsertId();
    }
    public function update(int $id, array $b): int
    {
        $sets = [];
        $args = [':id' => $id];
        foreach (['Title', 'DateTime', 'Description'] as $f) {
            if (array_key_exists($f, $b)) {
                $sets[] = "$f=:$f";
                $args[":$f"] = trim($b[$f]);
            }
        }
        if (array_key_exists('Duration', $b)) {
            $sets[] = 'Duration=:Duration';
            $args[':Duration'] =
                (int) $b['Duration'];
        }
        if (!$sets)
            return 0;
        $sql = 'UPDATE MeetingReport SET ' . implode(',', $sets) . ' WHERE MeetingID=:id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($args);
        return $stmt->rowCount();
    }
    public function delete(int $id): bool
    {
        $stmt = $this->pdo->prepare('DELETE FROM MeetingReport WHERE MeetingID = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() === 1;
    }
}