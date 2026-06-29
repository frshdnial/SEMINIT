<?php
namespace App\Controllers;

use App\Models\MeetingReportRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class MeetingReportControllers
{
    //container for storing database repository
    public function __construct(private MeetingReportRepository $reports)
    {
    }

    //for GET request
    public function index(Request $req, Response $res): Response
    {
        $p = $req->getQueryParams();
        $rows = $this->reports->all((string) ($p['q'] ?? ''), (int) ($p['limit'] ?? 0));//calls all() method for database search
        return $this->json($res, ['count' => count($rows), 'data' => $rows]);//return the total count and report data list
    }

    //fetching single report
    public function show(Request $req, Response $res, array $a): Response
    {
        $report = $this->reports->find((int) $a['id']);
        return $report ? $this->json($res, $report)//finds the report by id
            : $this->json($res, ['error' => 'Meeting report not found'], 404);
    }

    //create new report
    public function create(Request $req, Response $res): Response
    {
        $body = (array) ($req->getParsedBody() ?? []);
        
        $auth = (array) $req->getAttribute('auth', []);
        $userId = (int) ($auth['sub'] ?? 0);

        $errors = $this->validate($body, true);
        if ($errors) {
            return $this->json($res, ['errors' => $errors], 400);
        }

        $id = $this->reports->create($body, $userId);
        
        return $this->json(
            $res,
            ['message' => 'Meeting report created', 'data' => $this->reports->find($id)],
            201
        )->withHeader('Location', '/api/reports/' . $id);
    }

    //update report
    public function update(Request $req, Response $res, array $args): Response
    {
        $id = (int) ($args['id'] ?? 0);

        $current = $this->reports->find($id);
        if ($current === null) {
            return $this->json($res, ['error' => "Meeting report {$id} not found"], 404);
        }

        $body = (array) ($req->getParsedBody() ?? []);

        $errors = $this->validate($body, false);
        if (!empty($errors)) {
            return $this->json($res, ['errors' => $errors], 400);
        }

        $this->reports->update($id, $body);
        $updatedReport = $this->reports->find($id);

        return $this->json($res, ['message' => 'Meeting report updated', 'data' => $updatedReport]);
    }

    //delete report
    public function delete(Request $req, Response $res, array $args): Response
    {
        $id = (int) ($args['id'] ?? 0);

        $deleted = $this->reports->find($id);
        if ($deleted === null) {
            return $this->json($res, ['error' => "Meeting report {$id} not found"], 404);
        }

        $this->reports->delete($id);
        return $this->json($res, ['message' => 'Meeting report deleted', 'data' => $deleted]);
    }

    //validate report
    private function validate(array $b, bool $requireAll): array
    {
        $errors = [];

        if ($requireAll) {
            if (empty($b['Title']))       $errors['Title'] = 'Title is required.';
            if (empty($b['Description'])) $errors['Description'] = 'Description is required.';
            if (empty($b['Duration']))    $errors['Duration'] = 'Duration is required.';
            if (empty($b['DateTime']))    $errors['DateTime'] = 'DateTime is required.';
        }

        if (array_key_exists('Title', $b) && empty(trim((string) $b['Title']))) {
            $errors['Title'] = 'Title cannot be blank.';
        }

        if (array_key_exists('DateTime', $b) && empty(trim((string) $b['DateTime']))) {
            $errors['DateTime'] = 'Date cannot be blank.';
        }

        if (array_key_exists('Duration', $b)) {
            $duration = (int) $b['Duration'];
            // Fix 3: Checked against a proper duration logic check (greater than 0 seconds)
            if ($duration <= 0) {
                $errors['Duration'] = 'Please provide a valid duration in seconds.';
            }
        }

        return $errors;
    }

    private function json(Response $r, $data, int $code = 200): Response
    {
        $r->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
        return $r->withHeader('Content-Type', 'application/json')->withStatus($code);
    }
}